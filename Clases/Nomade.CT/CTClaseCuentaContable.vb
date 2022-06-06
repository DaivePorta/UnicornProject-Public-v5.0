Public Class CTClaseCuentaContable

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnAgregarClaseCuentaContab(sCodigoSunat As String, sDescripcion As String,
                                                sDescripcionCorta As String, nNumeracion As Integer,
                                                sEstado As String, sCodUsuario As String, sUsaCentroCostos As String, sGeneraDestino As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarClaseCuentaContab", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoSunat", sCodigoSunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DescripcionCorta", sDescripcionCorta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Numeracion", nNumeracion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodClaseCuenta", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_sUsaCentroCostos", sUsaCentroCostos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_sGeneraDestino", sGeneraDestino, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            Dim sCodClaseCuenta As String
            sCodClaseCuenta = cmd.Parameters("@p_CodClaseCuenta").Value
            Return sCodClaseCuenta
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnEditarClaseCuentaContab(sCodClaseCuenta As String, sCodigoSunat As String,
                                          sDescripcion As String, sDescripcionCorta As String,
                                          nNumeracion As Integer, sEstado As String, sCodUsuario As String, sUsaCentroCostos As String, sGeneraDestino As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_EditarClaseCuentaContab", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodClaseCuenta", sCodClaseCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoSunat", sCodigoSunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DescripcionCorta", sDescripcionCorta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Numeracion", nNumeracion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_sUsaCentroCostos", sUsaCentroCostos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_sGeneraDestino", sGeneraDestino, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListaClasesCuentas(ByVal sCodClaseCuenta As String, ByVal nNumeracion As Integer, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaClasesCuentas", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodClaseCuenta", IIf(sCodClaseCuenta.Equals(""), Nothing, sCodClaseCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Numeracion", IIf(nNumeracion = -1, Nothing, nNumeracion), ParameterDirection.Input, 253))
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

    Public Function fnCambiarEstadoClaseCtaContab(ByVal sCodClaseCuenta As String, ByVal sCodUsuario As String) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_CambiarEstadoClaseCtaContab", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodClaseCuenta", sCodClaseCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", Nothing, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Dim sEstado As String = cmd.Parameters("@p_Estado").Value

            Return sEstado
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
