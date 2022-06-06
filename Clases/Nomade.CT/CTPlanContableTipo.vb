Imports System.Data.SqlClient
Public Class CTPlanContableTipo
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnAgregarTipoPlanContab(ByVal sCodigoSunat As String, ByVal sDescripcion As String,
                                           ByVal sDescripcionCorta As String, ByVal sAbreviatura As String,
                                           ByVal sEstado As String, ByVal oDT_TablaPlanContableTipoxClaseCuenta As String,
                                            ByVal sCodUsuario As String) As String

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarTipoPlanContab", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoSunat", sCodigoSunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DescripcionCorta", sDescripcionCorta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Abreviatura", sAbreviatura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), DBNull.Value, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PlanContableTipoxClaseCuenta", oDT_TablaPlanContableTipoxClaseCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", String.Empty, ParameterDirection.Output, 253))

            'Dim param As New SqlParameter("@petyPlanContableTipoxClaseCuenta", oDT_TablaPlanContableTipoxClaseCuenta)
            'param.SqlDbType = SqlDbType.Structured
            'param.TypeName = "Contabilidad.TypePlanContableTipoxClaseCuenta"
            'cmd.Parameters.Add(param)

            cmd = cn.Ejecuta_parms(cmd)

            Dim sCodTipoPlanContab As String = cmd.Parameters("@p_CodTipoPlanContab").Value

            Return sCodTipoPlanContab
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnEditarTipoPlanContable(ByVal sCodTipoPlanContab As String, ByVal sCodigoSunat As String,
                                        ByVal sDescripcion As String, ByVal sDescripcionCorta As String,
                                        ByVal sAbreviatura As String, ByVal sEstado As String,
                                        ByVal oDT_TablaPlanContableTipoxClaseCuenta As String, ByVal sCodUsuario As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_EditarTipoPlanContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", sCodTipoPlanContab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoSunat", sCodigoSunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DescripcionCorta", sDescripcionCorta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Abreviatura", sAbreviatura, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), DBNull.Value, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, DbType.String))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PlanContableTipoxClaseCuenta", oDT_TablaPlanContableTipoxClaseCuenta, ParameterDirection.Input, 253))

            'Dim param As New SqlParameter("@petyPlanContableTipoxClaseCuenta", oDT_TablaPlanContableTipoxClaseCuenta)
            'param.SqlDbType = SqlDbType.Structured
            'param.TypeName = "Contabilidad.TypePlanContableTipoxClaseCuenta"
            'cmd.Parameters.Add(param)

            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListaTipoPlanContable(ByVal sCodTipoPlanContab As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_ListaTipoPlanContable", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", sCodTipoPlanContab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), DBNull.Value, sEstado), ParameterDirection.Input, 253))
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

    ' ''' <summary>
    ' ''' Procedimiento al parecer ya no se usa.
    ' ''' </summary>
    ' ''' <param name="sCodTipoPlanContab"></param>
    ' ''' <param name="sCodUsuario"></param>
    ' ''' <returns></returns>
    'Public Function fnCambiarEstadoTipoPlanContable(ByVal sCodTipoPlanContab As String, ByVal sCodUsuario As String) As String
    '    Try
    '        Dim cmd As IDbCommand

    '        cmd = cn.GetNewCommand("SpCon_CambiarEstadoTipoPlanContable", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", sCodTipoPlanContab, ParameterDirection.Input, DbType.String))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", DBNull.Value, ParameterDirection.Input, DbType.Boolean))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, DbType.String))
    '        cmd = cn.Ejecuta_parms(cmd)

    '        Dim sEstado As String = cmd.Parameters("@p_Estado").Value

    '        Return sEstado
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

    Public Function fnListaTipoPlanContabxClaseCta(ByVal sCodTipoPlanContab As String, ByVal sCodClaseCuenta As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_ListaTipoPlanContabxClaseCta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", IIf(sCodTipoPlanContab.Equals(""), DBNull.Value, sCodTipoPlanContab), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodClaseCuenta", IIf(sCodClaseCuenta.Equals(""), DBNull.Value, sCodClaseCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), DBNull.Value, sEstado), ParameterDirection.Input, 253))

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
