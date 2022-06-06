Imports System.Data.SqlClient
Public Class CTDinamicaCuenta

    Private cn As Nomade.Connection
    Dim oDT As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Sub fnAgregarDinamicaCuenta(ByVal sCodEmpresa As String, ByVal sCodOperacion As String, ByVal sCodTipoMoneda As String,
                                       ByVal sCodLibro As String, ByVal sDescripcion As String, ByVal sEstado As String,
                                      ByVal sCodUsuario As String, ByVal oDT_TablaDinamicaCuentaDet As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarDinamicaCuenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", sCodOperacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MoneCode", sCodTipoMoneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", sCodLibro, ParameterDirection.Input, 243))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", sEstado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DinamicaCuentaDet", sCodUsuario, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Sub fnEditarDinamicaCuenta(ByVal sCodEmpresa As String, ByVal sCodOperacion As String, ByVal sCodTipoMoneda As String,
                                      ByVal sCodLibro As String, ByVal sDescripcion As String, ByVal sEstado As String,
                                      ByVal sCodUsuario As String, ByVal oDT_TablaDinamicaCuentaDet As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_EditarDinamicaCuenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", sCodOperacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MoneCode", sCodTipoMoneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", sCodLibro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", sEstado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DinamicaCuentaDet", sCodUsuario, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListaDinamicaCuenta(ByVal sCodEmpresa As String, ByVal sCodOperacion As String, ByVal sCodTipoMoneda As String,
                                          ByVal sCodLibro As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaDinamicaCuenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", IIf(sCodOperacion.Equals(""), Nothing, sCodOperacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MoneCode", IIf(sCodTipoMoneda.Equals(""), Nothing, sCodTipoMoneda), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", IIf(sCodLibro.Equals(""), Nothing, sCodLibro), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnCambiarEstadoDinamicaCuenta(ByVal sCodEmpresa As String, ByVal sCodOperacion As String, ByVal sCodTipoMoneda As String, ByVal sCodUsuario As String) As Boolean
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_CambiarEstadoDinamicaCuenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", sCodOperacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MoneCode", sCodTipoMoneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Dim bEstado As Boolean = cmd.Parameters("@p_Estado").Value
            Return bEstado
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListaDinamicaCuentaDet(ByVal sCodEmpresa As String, ByVal sCodOperacion As String, ByVal sCodTipoMoneda As String,
                                             ByVal sCodLibro As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaDinamicaCuentaDet", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", IIf(sCodOperacion.Equals(""), Nothing, sCodOperacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoMoneda", IIf(sCodTipoMoneda.Equals(""), Nothing, sCodTipoMoneda), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", IIf(sCodLibro.Equals(""), Nothing, sCodLibro), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Public Function fnExisteDinamicaCuentaDet(ByVal sCodEmpresa As String, ByVal sCodLibro As String, ByVal sCodTipoMoneda As String,
    '                                          ByVal sCodDinamicaCuenta As String, ByVal oDT_TablaDinamicaCuentaDet As DataTable) As DataTable
    '    Try
    '        Dim cmd As IDbCommand
    '        cmd = cn.GetNewCommand("Contabilidad.SpCon_ExisteDinamicaCuentaDet", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodLibro", sCodLibro, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodTipoMoneda", sCodTipoMoneda, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@peCodDinamicaCuenta", IIf(sCodDinamicaCuenta.Equals(""), DBNull.Value, sCodDinamicaCuenta), ParameterDirection.Input, 253))

    '        Dim param As New SqlParameter("@petyDinamicaCuentaDet", oDT_TablaDinamicaCuentaDet)
    '        param.SqlDbType = SqlDbType.Structured
    '        param.TypeName = "Contabilidad.TypeDinamicaCuentaDet"
    '        cmd.Parameters.Add(param)

    '        Dim oDT As DataTable
    '        oDT = cn.Consulta(cmd)
    '        If oDT Is Nothing Then
    '            Return Nothing
    '        ElseIf oDT.Rows.Count = 0 Then
    '            Return Nothing
    '        Else
    '            Return oDT
    '        End If

    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

    Public Function fnListaOperacionesxDinamicaCuenta(ByVal sCodEmpresa As String, ByVal sCodLibro As String, ByVal sCodTipoMoneda As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaOperacionesxDinamicaCuenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", IIf(sCodLibro.Equals(""), Nothing, sCodLibro), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoMoneda", IIf(sCodTipoMoneda.Equals(""), Nothing, sCodTipoMoneda), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
