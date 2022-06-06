Public Class OPConceptoBeneficios
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

#Region "CONCEPTOS DE BENEFICIOS COOPERATIVOS"

    Public Function fnCrearConceptoBeneficios(ByVal sCodEmpresa As String, ByVal sDescripcion As String, ByVal sPeriodicidad As String,
                                          ByVal sEstado As String, ByVal sCodUsuario As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("Operaciones.SpOpe_AgregarConceptoBeneficios", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcion", sDescripcion, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecPeriodicidad", sPeriodicidad, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuarioCrea", sCodUsuario, ParameterDirection.Input, DbType.String))

            cmd.Parameters.Add(cn.GetNewParameter("@psIdConcepto", String.Empty, ParameterDirection.Output, SqlDbType.Int))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@psIdConcepto").Value.ToString
            msg(1) = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnEditarConceptoBeneficios(ByVal sCodEmpresa As String, ByVal nIdConcepto As Integer, ByVal sDescripcion As String, ByVal sPeriodicidad As String,
                                        ByVal sFechaFin As String, ByVal sEstado As String, ByVal sCodUsuario As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Operaciones.SpOpe_EditarConceptoBeneficios", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@peidConcepto", nIdConcepto, ParameterDirection.Input, DbType.Int16))
            cmd.Parameters.Add(cn.GetNewParameter("@pecDescripcion", sDescripcion, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pecPeriodicidad", sPeriodicidad, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@petFechaFin", IIf(sFechaFin.Equals(""), DBNull.Value, sFechaFin), ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuarioModif", sCodUsuario, ParameterDirection.Input, DbType.String))
            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListaConceptoBeneficios(ByVal sCodEmpresa As String, ByVal nIdConcepto As Integer, ByVal sEstado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Operaciones.SpOpe_ListaConceptoBeneficios", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@peidConcepto", IIf(nIdConcepto = 0, DBNull.Value, nIdConcepto), ParameterDirection.Input, DbType.Int16))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
            dt = cn.Consulta(cmd)

            If dt Is Nothing Then
                Return Nothing
            ElseIf dt.Rows.Count = 0 Then
                Return Nothing
            Else
                Return dt
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
#End Region

#Region "MONTOS DE CONCEPTOS DE BENEFICIOS COOPERATIVOS"

    Public Function fnListaMontosConceptoBeneficio(ByVal sCodEmpresa As String, ByVal nIdConcepto As Integer, ByVal nItem As Integer, ByVal sEstado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("Operaciones.SpOpe_ListaMontosConceptoBeneficio", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@peidConcepto", IIf(nIdConcepto = 0, DBNull.Value, nIdConcepto), ParameterDirection.Input, DbType.Int16))
            cmd.Parameters.Add(cn.GetNewParameter("@penItem", IIf(nItem = 0, DBNull.Value, nItem), ParameterDirection.Input, DbType.Int16))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
            dt = cn.Consulta(cmd)

            If dt Is Nothing Then
                Return Nothing
            ElseIf dt.Rows.Count = 0 Then
                Return Nothing
            Else
                Return dt
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function fnAgregarMontoConceptoBeneficio(ByVal sCodEmpresa As String, ByVal nIdConcepto As Integer,
                                          ByVal dImporte As Decimal, ByVal sEstado As String, ByVal sCodUsuario As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("Operaciones.SpOpe_AgregarMontoConceptoBeneficio", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@peidConcepto", IIf(nIdConcepto = 0, DBNull.Value, nIdConcepto), ParameterDirection.Input, DbType.Int16))
            cmd.Parameters.Add(cn.GetNewParameter("@pedImporte", dImporte, ParameterDirection.Input, DbType.Decimal))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), DBNull.Value, IIf(sEstado.Equals("A"), True, False)), ParameterDirection.Input, DbType.Boolean))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodUsuarioCrea", sCodUsuario, ParameterDirection.Input, DbType.String))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

#End Region

End Class
