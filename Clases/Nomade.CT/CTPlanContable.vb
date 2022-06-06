Public Class CTPlanContable
    Private cn As Nomade.Connection
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnCrearPlanContable(sCodEmpresa As String, sCodTipoPlanContab As String, sNombre As String, iNiveles As Integer,
                                        sDigitosNiveles As String, sReplicaCreacion As String, sReplicaCreaDigitos As String,
                                        sReplicaEdicion As String, sReplicaEditaDigitos As String, sEstado As String, sPredeterminado As String,
                                        sCodUsuario As String) As String

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_CrearPlanContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", sCodTipoPlanContab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Nombre", sNombre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Niveles", iNiveles, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DigitosNiveles", sDigitosNiveles, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaCreacion", IIf(sReplicaCreacion.Equals(""), Nothing, sReplicaCreacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaCreaDigitos", IIf(sReplicaCreaDigitos.Equals(""), Nothing, sReplicaCreaDigitos), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaEdicion", IIf(sReplicaEdicion.Equals(""), Nothing, sReplicaEdicion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaEditaDigitos", IIf(sReplicaEditaDigitos.Equals(""), Nothing, sReplicaEditaDigitos), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Predeterminado", IIf(sPredeterminado.Equals(""), Nothing, sPredeterminado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            Dim sCodPlanContable As String = cmd.Parameters("@p_CodPlanContable").Value

            Return sCodPlanContable
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnActualizarPlanContable(sCodPlanContable As String, sCodEmpresa As String, sCodTipoPlanContab As String, sNombre As String,
                                        iNiveles As Integer, sDigitosNiveles As String, sReplicaCreacion As String, sReplicaCreaDigitos As String,
                                        sReplicaEdicion As String, sReplicaEditaDigitos As String, sEstado As String, sPredeterminado As String,
                                        sCodUsuario As String)

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ActualizarPlanContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", sCodTipoPlanContab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Nombre", sNombre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Niveles", iNiveles, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DigitosNiveles", sDigitosNiveles, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaCreacion", IIf(sReplicaCreacion.Equals(""), Nothing, sReplicaCreacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaCreaDigitos", IIf(sReplicaCreaDigitos.Equals(""), Nothing, sReplicaCreaDigitos), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaEdicion", IIf(sReplicaEdicion.Equals(""), Nothing, sReplicaEdicion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ReplicaEditaDigitos", IIf(sReplicaEditaDigitos.Equals(""), Nothing, sReplicaEditaDigitos), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Predeterminado", IIf(sPredeterminado.Equals(""), Nothing, sPredeterminado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListarPlanContable(ByVal sCodEmpresa As String, ByVal sCodPlanContable As String, ByVal sCodTipoPlanContab As String,
                                         ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_ListarPlanContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", IIf(sCodPlanContable.Equals(""), Nothing, sCodPlanContable), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", IIf(sCodTipoPlanContab.Equals(""), Nothing, sCodTipoPlanContab), ParameterDirection.Input, 253))
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


    ''' <summary>
    ''' Procedimiento que si se usa pero esta repetido en CTPlanContable y CTPlanContableTipo
    ''' </summary>
    ''' <param name="sCodTipoPlanContab"></param>
    ''' <param name="sEstado"></param>
    ''' <returns></returns>
    Public Function fnListaTipoPlanContable(ByVal sCodTipoPlanContab As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_ListaTipoPlanContable", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoPlanContab", sCodTipoPlanContab, ParameterDirection.Input, 253))
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
